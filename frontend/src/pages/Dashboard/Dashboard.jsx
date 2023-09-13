import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Container from "../../components/Container/Container";
import Box from "../../components/Box/Box";
import Card from "../../components/Card/Card";
import Typography from "../../components/Typography/Typography";
import { useTheme } from "../../hooks/useTheme";
import useApi from "../../hooks/useApi";
import { useEffect, useMemo, useState } from "react";
import Graph from "../../components/Graph/Graph";

export default function Dashboard() {
  const { currentTheme } = useTheme();
  const { getAnalytics } = useApi();
  const [analyticsData, setAnalyticsData] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isLoading = useMemo(() => !analyticsData, [analyticsData]);

  const dailyScaleData = useMemo(
    () =>
      analyticsData?.yearlySumPageVisitHours?.reduce(
        (obj, item) => {
          const { hour_of_day, average_records_count } = item;
          obj.rows.push(average_records_count);
          obj.columns.push(`${hour_of_day}:00`);
          return obj;
        },
        { rows: [], columns: [] }
      ),
    [analyticsData]
  );

  const monthlyViewsData = useMemo(() => {
    const rows = Array.from({ length: 12 }, () => 0);
    analyticsData?.yearlyVisitPerMonth?.forEach(
      (item) => (rows[item.month - 1] += +item.page_count)
    );
    return { rows, columns: MONTHS };
  }, [analyticsData]);

  const postTimeSpent = useMemo(() => {
    const data = {};
    analyticsData?.yearlyVisitPerMonth?.forEach((item) => {
      if (!data[item.page]) data[item.page] = 0;
      data[item.page] += +item.total_visittime / 1000;
    });
    delete data.home;
    delete data.blog;
    delete data.dashboard;

    return { rows: Object.values(data), columns: Object.keys(data) };
  }, [analyticsData]);

  const postViews = useMemo(() => {
    const data = {};
    analyticsData?.yearlyVisitPerMonth?.forEach((item) => {
      if (!data[item.page]) data[item.page] = 0;
      data[item.page] += +item.page_count;
    });
    delete data.home;
    delete data.blog;
    delete data.dashboard;
    return { rows: Object.values(data), columns: Object.keys(data) };
  }, [analyticsData]);

  const timeZones = useMemo(
    () =>
      analyticsData?.timeZoneCounts?.reduce(
        (obj, item) => {
          const { timezone, timezone_count: count } = item;
          obj.rows.push(count);
          obj.columns.push(timezone);
          return obj;
        },
        { rows: [], columns: [] }
      ),
    [analyticsData]
  );

  const getAnalyticsData = async () => {
    const data = await getAnalytics();
    setAnalyticsData(data);
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  const cardColors = [
    `${currentTheme.success}20`,
    `${currentTheme.danger}20`,
    `${currentTheme.warning}20`,
  ];

  const boxStyle = {
    justifyContent: "space-between",
    gap: "10px",
  };

  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

  if (isMobile)
    return (
      <Typography variant="h1" style={{ textAlign: "center" }}>
        This page does not supports small resolutions
      </Typography>
    );
  if (isLoading) return <Typography variant="h1">Loading...</Typography>;
  return (
    <>
      <Header />
      <Container>
        <Box isHorizontal style={boxStyle}>
          <Card isFlat bgColor={cardColors[0]} width="100%" style={cardStyle}>
            <Typography variant="h2">
              {analyticsData?.totalUniqueEntries || 0}
            </Typography>
            <Typography variant="subtitle">Total Unique Entires</Typography>
          </Card>
          <Card isFlat bgColor={cardColors[1]} width="100%" style={cardStyle}>
            <Typography variant="h2">
              {analyticsData?.totalViews || 0}
            </Typography>
            <Typography variant="subtitle">Total Views</Typography>
          </Card>
          <Card isFlat bgColor={cardColors[2]} width="100%" style={cardStyle}>
            <Typography variant="h2">
              {analyticsData?.newUsersThisMonth || 0}
            </Typography>
            <Typography variant="subtitle">
              Unique Entries This Month
            </Typography>
          </Card>
        </Box>

        <Box isHorizontal style={boxStyle}>
          <Card width="100%" height={"fit-content"}>
            <Graph
              title="Post Views"
              subtitle="How many times are posts viewed?"
              rows={postViews.rows}
              columns={postViews.columns}
              variant="vertical"
            />
          </Card>
        </Box>

        <Box isHorizontal style={boxStyle}>
          <Card width="100%" height={"fit-content"}>
            <Graph
              title="Post Time Spent"
              subtitle="How much time do users spend on posts? (seconds)"
              rows={postTimeSpent.rows}
              columns={postTimeSpent.columns}
              variant="vertical"
            />
          </Card>
        </Box>

        <Box isHorizontal style={boxStyle}>
          <Card width="20%" style={cardStyle}>
            <Typography variant="h2">
              {analyticsData?.totalAdClicks || 0}/
              {analyticsData?.totalAdViews || 0}
            </Typography>
            <Typography variant="subtitle2">
              Ad Clicks / Ad Views this month
            </Typography>
          </Card>
          <Card width="20%" style={cardStyle}>
            <Typography variant="h2">
              {Math.ceil(analyticsData?.averageTimeSpentPerDay / (1000 * 60)) ||
                0}
            </Typography>
            <Typography variant="subtitle2">
              Avrage Time Spent Per Day (Minutes)
            </Typography>
          </Card>
          <Card width="20%" style={cardStyle}>
            <Typography variant="h2">
              {analyticsData?.totalAdClicks || 0}
            </Typography>
            <Typography variant="subtitle2">Total Ad Clicked</Typography>
          </Card>
          <Card width="20%" style={cardStyle}>
            <Typography variant="h2">
              {analyticsData?.totalAdViews || 0}
            </Typography>
            <Typography variant="subtitle2">Total Ad Viewed</Typography>
          </Card>
          <Card width="20%" style={cardStyle}>
            <Typography variant="h2">
              {Math.ceil(analyticsData?.totalSpentTime / (60 * 1000)) || 0}
            </Typography>
            <Typography variant="subtitle2">
              Total Time Spent (Minutes)
            </Typography>
          </Card>
        </Box>

        <Box isHorizontal style={boxStyle}>
          <Card width="50%">
            <Graph
              title="Monthly Views Graph"
              subtitle="What is the monthly view count?"
              rows={monthlyViewsData.rows}
              columns={monthlyViewsData.columns}
              variant="horizontal"
            />
          </Card>
          <Card width="50%">
            <Graph
              title="Time Zone"
              subtitle="What are the time zones of the users?"
              rows={timeZones.rows}
              columns={timeZones.columns}
              variant="horizontal"
            />
          </Card>
        </Box>

        <Box isHorizontal style={boxStyle}>
          <Card width="100%">
            <Graph
              title="Daily Scale"
              subtitle="In which hour of the day do users spend the most time?"
              rows={dailyScaleData.rows}
              columns={dailyScaleData.columns}
              variant="horizontal"
            />
          </Card>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
