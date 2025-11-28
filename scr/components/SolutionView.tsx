import React, { useState } from "react";
import { solveProblem } from "../services/geminiService";

const SolutionView: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSolve = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const output = await solveProblem(prompt);
      setResult(output);
    } catch (err) {
      console.error(err);
      setResult("Có lỗi xảy ra khi gọi Gemini API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CodeSolver AI</h1>
      <textarea
        className="w-full p-3 border rounded text-black"
        rows={4}
        placeholder="Nhập đề bài hoặc yêu cầu cần giải..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleSolve}
        className="mt-4 px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-500"
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Giải bài"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-800 rounded text-white whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Kết quả:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default SolutionView;
