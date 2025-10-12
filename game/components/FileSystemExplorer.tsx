
import React from 'react';

interface File {
    name: string;
    content: string;
}

interface FileSystemExplorerProps {
    files: File[];
    onFileSelect: (file: File) => void;
}

const FileSystemExplorer: React.FC<FileSystemExplorerProps> = ({ files, onFileSelect }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg h-full border border-gray-700">
            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2"> 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h5l2 3h8v9H3z" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                File Explorer
            </h3>
            <ul className="space-y-2">
                {files.map((file) => (
                    <li key={file.name}>
                        <button onClick={() => onFileSelect(file)} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 hover:text-green-300 transition-all flex items-center gap-3">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h5l2 3h8v9H3z" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <span className="truncate">{file.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileSystemExplorer;
