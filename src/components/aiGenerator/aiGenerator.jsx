import "./aiGenerator.css";
import { useState } from "react";
import { GenerateTextCall } from "../../apiCalls/apiCalls.js";

export default function AIGenerator({
  setDesc,
}) {

  const [aiPrompt, setAiPrompt] =
    useState("");

  const [aiTone, setAiTone] =
    useState("casual");

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [error, setError] =
    useState(null);

  const handleGenerate =
    async () => {

      if (!aiPrompt.trim()) {

        setError(
          "Please enter a topic"
        );

        return;
      }

      try {

        setError(null);

        setIsGenerating(true);

        const data =
          await GenerateTextCall(
            aiPrompt,
            aiTone
          );

        setDesc(data.text);

      } catch (err) {

        console.log(err);

        setError(
          err.response?.data?.message ||
          "Failed to generate text"
        );

      } finally {

        setIsGenerating(false);

      }
    };

  return (

    <div className="aiGenerator">

      <div className="aiGeneratorHeader">
        ✨ AI Post Generator
      </div>

      <input
        type="text"
        placeholder="What should the post be about?"
        value={aiPrompt}
        onChange={(e) =>
          setAiPrompt(e.target.value)
        }
        className="aiInput"
      />

      <select
        value={aiTone}
        onChange={(e) =>
          setAiTone(e.target.value)
        }
        className="aiSelect"
      >

        <option value="casual">
          Casual
        </option>

        <option value="professional">
          Professional
        </option>

        <option value="funny">
          Funny
        </option>

        <option value="motivational">
          Motivational
        </option>

      </select>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating}
        className="aiBtn"
      >

        {
          isGenerating
            ? "Generating..."
            : "✨ Generate Text"
        }

      </button>

      {
        error &&
        <p className="aiError">
          {error}
        </p>
      }

    </div>
  );
}