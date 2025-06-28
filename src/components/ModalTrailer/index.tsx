import { useEffect } from "react";

import { XIcon } from "lucide-react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    videoKey: string | null;
};

export const ModalTrailer = ({ isOpen, onClose, videoKey }: ModalProps) => {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-5 md:px-auto"
            onClick={onClose}
        >
            <div
                className="bg-slate-900 p-2 rounded-lg shadow-xl relative w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute -top-4 -right-4 bg-sky-600 p-2 rounded-full cursor-pointer"
                    onClick={onClose}
                >
                    <XIcon className="text-white" />
                </button>

                <div className="aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};
