import { useTheme } from "../../hooks/useTheme";
import "./style.css";

function extractTextAndColor(inputString) {
  const regex = /{{(.*?),(.*?)}}/g;
  const matches = [];
  let match;

  while ((match = regex.exec(inputString)) !== null) {
    const textBefore = inputString.substring(0, match.index);
    if (textBefore.length > 0) {
      matches.push({ text: textBefore });
    }

    const [, text, color] = match;
    matches.push({ text, color });
    inputString = inputString.substring(match.index + match[0].length);
    regex.lastIndex = 0;
  }

  if (inputString.length > 0) {
    matches.push({ text: inputString });
  }

  return matches;
}

export default function Typography({ children, style, variant }) {
  const { currentTheme } = useTheme();
  const textBreakdown = extractTextAndColor(children);

  const textColor = {
    primary: currentTheme.primary,
    secondary: currentTheme.secondary,
  };

  switch (variant) {
    case "h1":
      return (
        <h1 style={{ color: currentTheme.text, ...style }}>
          {textBreakdown.map(({ text, color }, idx) =>
            color ? (
              <span
                key={idx}
                style={{
                  color: textColor[color],
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                {text}
              </span>
            ) : (
              text
            )
          )}
        </h1>
      );
    case "h2":
      return <h2 style={{ color: currentTheme.text, ...style }}>{children}</h2>;
    case "h3":
      return <h3 style={{ color: currentTheme.text, ...style }}>{children}</h3>;
    case "h4":
      return <h4 style={{ color: currentTheme.text, ...style }}>{children}</h4>;
    case "h5":
      return <h5 style={{ color: currentTheme.text, ...style }}>{children}</h5>;
    case "h6":
      return <h6 style={{ color: currentTheme.text, ...style }}>{children}</h6>;
    case "text":
      return (
        <span style={{ color: currentTheme.text, ...style }}>{children}</span>
      );
    case "subtitle":
      return (
        <span className={"subtitle"} style={style}>
          {children}
        </span>
      );
    case "subtitle2":
      return (
        <span className={"subtitle2"} style={style}>
          {children}
        </span>
      );
    case "code":
      const codeSnippet = children.split("\n");
      const codeLength = codeSnippet.length;

      return (
        <code className="code">
          {codeSnippet.map((line, idx) => (
            <span key={idx}>
              {`${codeLength > 1 ? idx + TAB : ""}${line.replace(
                /\s/g,
                SPACE
              )}`}
              <br />
            </span>
          ))}
        </code>
      );
  }
}

const SPACE = "\u00a0";
const TAB = SPACE.repeat(2);
