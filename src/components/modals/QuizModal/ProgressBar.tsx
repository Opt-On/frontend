export default function ProgressBar({
  currentIndex,
}: {
  currentIndex: number;
}) {
  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {new Array(10).fill(null).map((_, index) => (
        <>
          {currentIndex === index ? (
            <div
              style={{
                margin: "4px",
                width: "30px",
                height: "10px",
                borderRadius: "10px",
                background: "black",
                opacity: "50%",
              }}
            />
          ) : (
            <div
              style={{
                margin: "4px",
                width: "10px",
                height: "10px",
                borderRadius: "10px",
                background: "black",
                opacity: "25%",
              }}
            />
          )}
        </>
      ))}
    </div>
  );
}
