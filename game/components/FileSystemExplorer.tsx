
import React from 'react';
import { FiFileText } from 'react-icons/fi';

interface File {
    name: string;
    content: string;
}

interface FileSystemExplorerProps {
    files: File[];
    onFileSelect: (file: File) => void;
    allowsFiles?: boolean;
    onUpload?: (file: File) => void;
    onDelete?: (fileName: string) => void;
}

const FileSystemExplorer: React.FC<FileSystemExplorerProps> = ({ files, onFileSelect, allowsFiles = true, onUpload, onDelete }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg h-full border border-gray-700">
            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2"> 
                <FiFileText className="text-green-300 neon-green" />
                File Explorer
            </h3>
            <ul className="space-y-2">
                {files.map((file) => (
                    <li key={file.name} className="flex items-center justify-between">
                        <button onClick={() => onFileSelect(file)} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 hover:text-green-300 transition-all flex items-center gap-3">
                            <FiFileText className="text-gray-400 neon" />
                            <span className="truncate">{file.name}</span>
                        </button>
                        {onDelete && (
                            <button onClick={() => onDelete(file.name)} className="ml-2 text-xs text-red-400 hover:text-red-300">Delete</button>
                        )}
                    </li>
                ))}
            </ul>
            {allowsFiles && onUpload && (
                <div className="mt-3">
                    <label className="inline-block bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded cursor-pointer text-sm">
                        Upload file
                        <input type="file" className="hidden" onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            const reader = new FileReader();
                            reader.onload = () => {
                                const text = reader.result as string;
                                onUpload({ name: f.name, content: text });
                            };
                            reader.readAsText(f);
                        }} />
                    </label>
                </div>
            )}
        </div>
    );
};

export default FileSystemExplorer;
