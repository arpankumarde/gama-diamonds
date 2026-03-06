import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div className="dark! flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to Gama Diamonds!
      </h1>
      <Button>Click me</Button>
    </div>
  );
};

export default App;
