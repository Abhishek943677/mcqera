import axios from "axios";
import { useState, useEffect } from "react";

export default function RandomQuotes() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
    // Function to fetch the random quote from the API
    // const fetchQuote = async () => {
    //   try {
    //     const response = await axios.get('https://cors-anywhere.herokuapp.com/https://zenqutes.io/api/random');
    //     const data = response.data[0];
    //     setQuote(data.q);
    //     setAuthor(data.a);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching the quote:', error);
    //     setLoading(false); 
    //   }
    // };

    // // Fetch the quote when the component mounts
    // fetchQuote();
  }, []);

  return (
    <div className={`bg-transparent rounded-lg w-full`}>
      <h2 className="text-2xl text-center my-2">Quotes</h2>

      <div className="w-full bg-white shadow-md rounded-lg p-6 text-center">
        {loading ? (
          <div className="w-full">
            <div className="animate-pulse space-y-4">
              <p className="bg-gray-300 h-6 w-full rounded"></p>
              <p className="bg-gray-300 h-4 w-full rounded"></p>
            </div>
          </div>
        ) : (
          <div>
            <blockquote className="text-xl font-semibold italic text-gray-800">
              &ldquo;{"The longer we dwell on our misfortunes, the greater is their power to harm us"}&rdquo;
            </blockquote>
            <footer className="mt-4 text-lg text-gray-600">
              &mdash; {"Voltaire"}
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}
