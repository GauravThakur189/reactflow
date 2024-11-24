import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore(); // Access nodes and edges from the store

  const handleSubmit = async () => {
    try {
      // Send nodes and edges to the backend
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      // Parse the response
      const result = await response.json();

      // Display the response in an alert
      alert(
        `Number of Nodes: ${result.num_nodes}\nNumber of Edges: ${result.num_edges}\nIs DAG: ${result.is_dag}`
      );
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert("Failed to submit pipeline. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: "5vh",
        left: "calc(50vw - 50px)",
      }}
    >
      <button
        type="button"
        onClick={handleSubmit}
        style={{ width: "100px" }}
        className="button"
      >
        Submit
      </button>
    </div>
  );
};
