import { NextFunction, Request, Response } from "express";
import { databaseProvider } from "..";

export const analyticsService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const daysFromFirstLoadLog = await databaseProvider.executeRawQuery(
      `
      SELECT
        DATE_PART('day', NOW() - (SELECT MIN(timestamp) FROM load)) AS days_from_first_load_log;
      `
    );

    const totalUniqueEntries = await databaseProvider.countRecords(
      "load",
      "isunique = true"
    );

    const totalViews = await databaseProvider.countRecords("pagevisitduration");

    const totalSpentTime = await databaseProvider.executeRawQuery(
      `
      SELECT
        (SUM(duration) - (SELECT SUM(duration) FROM outoffocusduration)) AS total_time_spent
      FROM visitduration;
      `
    );

    const totalAdViews = await databaseProvider.countRecords("adview");

    const newUsersThisMonth = await databaseProvider.countRecords(
      "load",
      `EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE) AND isunique = true`
    );

    const monthlyAdViewsVsClick = await databaseProvider.executeRawQuery(
      `
      SELECT
        (SELECT COUNT(*) FROM adview WHERE EXTRACT(YEAR FROM timestamp) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE)) AS total_ad_views_this_month,
        (SELECT COUNT(*) FROM adview WHERE EXTRACT(YEAR FROM timestamp) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')) AS total_ad_views_last_month,
        (SELECT COUNT(*) FROM adclick WHERE EXTRACT(YEAR FROM timestamp) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE)) AS total_ad_clicks_this_month,
        (SELECT COUNT(*) FROM adclick WHERE EXTRACT(YEAR FROM timestamp) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')) AS total_ad_clicks_last_month;
      `
    );

    const yearlyVisitPerMonth = await databaseProvider.executeRawQuery(
      `
      SELECT
        EXTRACT(MONTH FROM timestamp) AS month,
        page,
        COUNT(*) AS page_count,
        SUM(visittime) AS total_visittime
      FROM pagevisitduration
      WHERE EXTRACT(YEAR FROM timestamp) = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY EXTRACT(MONTH FROM timestamp), page
      ORDER BY page_count, EXTRACT(MONTH FROM timestamp) DESC;
    `
    );

    const totalAdClicks = await databaseProvider.countRecords("adclick");
    const yearlySumPageVisitHours = await databaseProvider.executeRawQuery(
      `
      SELECT
        generate_series AS hour_of_day,
        AVG(records_count) AS average_records_count
      FROM (
        SELECT
          EXTRACT(HOUR FROM timestamp) AS hour_of_day,
          COUNT(*) AS records_count
        FROM pagevisitduration
        WHERE timestamp >= NOW() - INTERVAL '1 year'
        GROUP BY hour_of_day
      ) AS subquery
      RIGHT JOIN generate_series(0, 23) AS generate_series(hour_of_day)
      ON subquery.hour_of_day = generate_series.hour_of_day
      GROUP BY generate_series
      ORDER BY generate_series;
      `
    );

    const timeZoneCounts = await databaseProvider.executeRawQuery(
      `
      SELECT
        timezone,
        COUNT(*) AS timezone_count
      FROM load
      WHERE isunique = true
      GROUP BY timezone
      ORDER BY timezone;
      `
    );

    const averageTimeSpentPerDay = await databaseProvider.executeRawQuery(
      `
      SELECT
        (SUM(duration) - (SELECT SUM(duration) FROM outoffocusduration)) /
        (
          DATE_PART('day', NOW() - (SELECT MIN(timestamp) FROM load)) + 1
        ) AS average_time_spent_per_day
      FROM visitduration;
      `
    );

    return res.status(200).json({
      daysFromFirstLoadLog: daysFromFirstLoadLog[0].days_from_first_load_log,
      totalUniqueEntries,
      totalViews,
      totalSpentTime: totalSpentTime[0].total_time_spent,
      totalAdViews,
      newUsersThisMonth,
      monthlyAdViewsVsClick: monthlyAdViewsVsClick[0],
      yearlySumPageVisitHours,
      totalAdClicks,
      timeZoneCounts,
      yearlyVisitPerMonth,
      averageTimeSpentPerDay:
        averageTimeSpentPerDay[0].average_time_spent_per_day,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
