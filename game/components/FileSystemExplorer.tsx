
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
        <div className="bg-gray-800 p-4 rounded-lg h-full">
            <h3 className="text-lg font-bold text-green-400 mb-4">File Explorer</h3>
            <ul>
                {files.map((file) => (
                    <li key={file.name} className="mb-2">
                        <button onClick={() => onFileSelect(file)} className="text-white hover:text-green-400">
                            {file.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileSystemExplorer;
