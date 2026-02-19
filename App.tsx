
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Button } from './components/Button';
import { TextArea } from './components/TextArea';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateAdaptedLesson } from './services/geminiService';

const App: React.FC = () => {
  const [originalLesson, setOriginalLesson] = useState<string>('');
  const [adaptationRequirements, setAdaptationRequirements] = useState<string>('');
  const [adaptedLesson, setAdaptedLesson] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setError(null);
    setAdaptedLesson('');
    if (!originalLesson.trim() || !adaptationRequirements.trim()) {
      setError("Please provide both the original lesson and adaptation requirements.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await generateAdaptedLesson(originalLesson, adaptationRequirements);
      setAdaptedLesson(response);
    } catch (err: any) {
      console.error("Failed to generate adapted lesson:", err);
      setError(`Failed to generate adapted lesson: ${err.message || "An unknown error occurred."}`);
    } finally {
      setIsLoading(false);
    }
  }, [originalLesson, adaptationRequirements]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Original Lesson & Requirements</h2>
            <div className="mb-6">
              <label htmlFor="originalLesson" className="block text-gray-700 text-sm font-semibold mb-2">
                Original Lesson Content
              </label>
              <TextArea
                id="originalLesson"
                value={originalLesson}
                onChange={(e) => setOriginalLesson(e.target.value)}
                placeholder="Paste your existing lesson content here (e.g., objectives, activities, materials, assessment)."
                rows={10}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="adaptationRequirements" className="block text-gray-700 text-sm font-semibold mb-2">
                Adaptation Requirements
              </label>
              <TextArea
                id="adaptationRequirements"
                value={adaptationRequirements}
                onChange={(e) => setAdaptationRequirements(e.target.value)}
                placeholder="Describe how you want to adapt the lesson (e.g., 'for 5th grade science, focus on ecosystems, 30 minutes duration, use interactive activities')."
                rows={5}
              />
            </div>
          </section>

          {/* Output Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Adapted Lesson Output</h2>
            {isLoading && (
              <div className="flex justify-center items-center h-full min-h-[200px]">
                <LoadingSpinner />
                <p className="ml-3 text-lg text-gray-600">Generating lesson...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {!isLoading && adaptedLesson && (
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed overflow-auto max-h-[70vh] p-4 bg-gray-50 rounded-md">
                {adaptedLesson}
              </div>
            )}
            {!isLoading && !adaptedLesson && !error && (
              <p className="text-gray-500 italic">Your adapted lesson will appear here.</p>
            )}
          </section>
        </div>
      </main>

      {/* Sticky Action Button */}
      <div className="sticky bottom-0 left-0 right-0 bg-white shadow-xl p-4 border-t border-gray-200 z-10">
        <div className="container mx-auto flex justify-center max-w-7xl">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Adapting Lesson...' : 'Generate Adapted Lesson'}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
    