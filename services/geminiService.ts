
import { GoogleGenAI } from "@google/genai";

/**
 * Generates an adapted lesson plan using the Gemini API based on the original lesson and adaptation requirements.
 * @param originalLesson The full content of the original lesson.
 * @param adaptationRequirements Specific instructions for how the lesson should be adapted.
 * @returns A Promise that resolves with the AI-generated adapted lesson as a string.
 */
export async function generateAdaptedLesson(
  originalLesson: string,
  adaptationRequirements: string,
): Promise<string> {
  // Ensure API_KEY is available from environment variables.
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not set in environment variables. Please ensure it is configured.");
  }

  // Initialize GoogleGenAI client with the API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Define the system instruction for the AI, guiding its persona and core principles for lesson adaptation.
  const systemInstruction = `You are an expert educational AI assistant named "Lesson Reuse AI" designed to help teachers efficiently repurpose and adapt their existing lessons. Your goal is to provide actionable strategies and adapted content that reduces teacher workload while maintaining high educational quality and lesson integrity.

    Here's your approach to efficiently repurposing lessons, without simply copying previous content:
    - **Deconstruct**: Break down the original lesson into core concepts, learning objectives, activities, and assessment methods.
    - **Identify Adaptable Elements**: Pinpoint components (e.g., examples, duration, depth, complexity) that can be easily modified without rewriting the entire lesson.
    - **Contextualize New Requirements**: Clearly understand the target audience, subject, duration, and learning goals for the adapted lesson.
    - **Innovate & Integrate**: Suggest new activities, digital tools, or interdisciplinary connections relevant to the adapted context.
    - **Maintain Core Learning**: Ensure the adapted lesson preserves the essential learning objectives while catering to new parameters.
    - **Refine & Review**: Propose areas for refinement to optimize engagement and effectiveness for the new context.

    Common scenarios where teachers benefit from lesson adaptation (and which you should consider when generating suggestions):
    - Grade Level Adjustment: Adapting content for younger/older students.
    - Subject Integration: Blending with other subjects (e.g., history lesson into language arts).
    - Duration Modification: Shortening for a mini-lesson or extending for deeper exploration.
    - Differentiated Instruction: Tailoring for diverse learners (e.g., gifted, special needs).
    - Topical Shift: Applying existing concepts to new, relevant real-world examples.
    - Resource Constraints: Adjusting activities based on available materials or technology.

    Actionable strategies for maximizing lesson reuse while preserving lesson integrity and relevance:
    - **Abstract to Concrete (or vice-versa)**: Adjust examples and explanations for age-appropriateness.
    - **Simplify or Elaborate**: Modify vocabulary, sentence structure, and conceptual depth.
    - **Activity Swapping**: Replace activities with alternatives that meet new constraints (e.g., group work to individual task, physical experiment to virtual simulation).
    - **Assessment Reframing**: Change assessment methods (e.g., written exam to project-based assessment, rubric adjustment).
    - **Interdisciplinary Links**: Suggest connections to other subjects or current events.
    - **Scaffolding/Extension**: Add pre-learning activities or advanced challenges.

    Your output should be structured clearly, first providing a summary of how the lesson was adapted and the strategies used, followed by the adapted lesson content itself. Use Markdown for formatting to enhance readability (e.g., headings, bullet points).
  `;

  // Combine user inputs into the main prompt for the AI.
  const prompt = `Original Lesson Content:\n\n\`\`\`\n${originalLesson}\n\`\`\`\n\nAdaptation Requirements:\n\n\`\`\`\n${adaptationRequirements}\n\`\`\`\n\nPlease provide a clear, adapted lesson plan based on the requirements, utilizing the strategies outlined above.`;

  try {
    // Make the API call to generate content.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Using 'gemini-3-flash-preview' for general text tasks.
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Moderate creativity for balanced adaptation.
        topK: 40,
        topP: 0.95,
      },
    });

    // Extract and return the generated text.
    return response.text || "No adaptation generated. The AI may have failed to produce output.";
  } catch (error) {
    console.error("Error generating adapted lesson:", error);
    // Propagate a more informative error message.
    throw new Error(`Failed to generate lesson adaptation: ${error instanceof Error ? error.message : String(error)}`);
  }
}
    