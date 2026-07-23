export default async function LoadingTest() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div style={{ padding: "30px" }}>
      <h1>Loading Test</h1>
      <p>The page loaded after 3 seconds.</p>
    </div>
  );
}