import { React } from "react";
import Lottie from 'react-lottie';
import bookmarkAnimation from '../assets/Bookmark_Animation.json';

function Welcome(){
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: bookmarkAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="w-screen h-screen bg-green-100 flex items-center justify-center">
            <div className="flex flex-row">
                <div className="bg-green-100 neumorphismBox">
                    <Lottie 
                        options={defaultOptions}
                        height={400}
                        width={400}
                    />
                </div>
                <div className="flex flex-col pl-10 w-3/6">
                    <h1 className="text-3xl pb-10 text-left">Welcome to Bookmark Manager</h1>
                    <h3 className="text-xl text-left">Manage your bookmarks with Custom Groups of different Category</h3>
                    <div className="flex flex-row gap-2">
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                            Get Started
                        </button>
                        <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full">
                            Register
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Welcome;