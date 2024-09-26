const HomePage = () => {
  return (
    <div>
      {[...Array(100)].map((_, index) => (
        <h1 key={index}>Filamental Homepage</h1>
      ))}
    </div>
  );
};

export default HomePage;
