import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    try {
      
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      
      const result = await response.json();

      
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
