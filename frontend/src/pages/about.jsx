// pages/about.jsx
import React from "react";
import Navbar from "../components/Navbar";

function About() {
    return (
        <>
            <Navbar />
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">About NoteKeeper</h1>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    NoteKeeper is a simple and elegant note-taking application built with React and Tailwind CSS.
                    It allows you to create, organize, and filter your notes easily using tags and search.
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    Whether you're a developer jotting down code snippets, a student tracking study notes,
                    or just someone who needs a personal checklist — NoteKeeper is designed to help you stay organized.
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300">
                    Built with ❤️ by [Your Name]. Feel free to explore, modify, and improve this app.
                </p>
            </div>
        </>
    );
}

export default About;
