import "./aiGenerator.css";
import { useState } from "react";
import { GenerateTextCall } from "../../apiCalls/apiCalls.js";

export default function AIGenerator({ setDesc }) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiTone, setAiTone] = useState(""); // Empty string defaults to placeholder
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) {
      setError("Please enter a topic or prompt for your post.");
      return;
    }

    try {
      setError(null);
      setSuccess(false);
      setIsGenerating(true);

      // Fallback to "casual" if they leave it on the placeholder
      const selectedTone = aiTone || "casual";
      const data = await GenerateTextCall(aiPrompt, selectedTone);

      setDesc(data.text);
      setSuccess(true);
      
      setTimeout(() => setSuccess(false), 4000);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "The AI assistant is temporarily congested. Please try again in a moment."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="aiGenerator">
      <div className="aiGeneratorHeader">
        <span className="aiSparkleIcon">✨</span>
        <div className="aiHeaderTextGroup">
          <h3>AI Post Composer</h3>
          <p>Generate highly engaging copy instantly</p>
        </div>
      </div>

      <div className="aiFormContainer">
        <input
          type="text"
          placeholder="What should the post be about?"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          className="aiInput"
          disabled={isGenerating}
        />

        <div className="aiSelectWrapper">
          <select
            value={aiTone}
            onChange={(e) => setAiTone(e.target.value)}
            className={`aiSelect ${aiTone === "" ? "placeholderActive" : ""}`}
            disabled={isGenerating}
          >
            <option value="" disabled hidden>
              Select post tone...
            </option>
            <option value="casual">Casual & Friendly</option>
            <option value="professional">Professional / Tech</option>
            <option value="funny">Humorous & Witty</option>
            <option value="motivational">Inspiring & Bold</option>
            <option value="sad">Sad & Empathetic</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`aiBtn ${isGenerating ? "loading" : ""}`}
      >
        {isGenerating ? (
          <div className="aiLoaderGroup">
            <span className="aiSpinner"></span>
            <span>Crafting Content...</span>
          </div>
        ) : (
          "✨ Generate Social Copy"
        )}
      </button>

      {error && (
        <div className="aiMessageBanner errorBanner">
          <span className="bannerIcon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="aiMessageBanner successBanner">
          <span className="bannerIcon">✅</span>
          <p>Post generated and copied into your editor above!</p>
        </div>
      )}
    </div>
  );
}