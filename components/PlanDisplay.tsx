
import React from 'react';

interface PlanDisplayProps {
  plan: string;
}

// This component manually parses a specific markdown-like format into JSX
const renderPlan = (planText: string) => {
    const lines = planText.split('\n').filter(line => line.trim() !== '');
    const components: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let inList = false;

    const flushList = () => {
        if (listItems.length > 0) {
            components.push(<ul key={`ul-${components.length}`} className="space-y-2 mb-4">{listItems}</ul>);
            listItems = [];
            inList = false;
        }
    };

    lines.forEach((line, i) => {
        const videoLinkRegex = /\[Video\]\((https?:\/\/[^\s)]+)\)/;
        const videoMatch = line.match(videoLinkRegex);
        const lineWithoutVideo = line.replace(videoLinkRegex, '').trim();

        if (line.startsWith('# ')) {
            flushList();
            components.push(<h1 key={i} className="text-4xl font-bold text-slate-900 mb-4">{line.substring(2)}</h1>);
        } else if (line.startsWith('## ')) {
            flushList();
            components.push(<h2 key={i} className="text-3xl font-semibold text-slate-800 mt-8 mb-4 pb-2 border-b border-slate-200">{line.substring(3)}</h2>);
        } else if (line.startsWith('**Week')) {
            flushList();
            components.push(<h3 key={i} className="text-2xl font-semibold text-slate-700 mt-6 mb-3">{line.replace(/\*\*/g, '')}</h3>);
        } else if (line.startsWith('- ')) {
            if (!inList) inList = true;
            const content = lineWithoutVideo.substring(2);

            if (content.startsWith('Day ')) {
                listItems.push(<li key={i} className="text-lg font-medium text-slate-600 mt-4 list-none">{content}</li>);
            } else if (content.includes(':')) {
                const parts = content.split(':');
                const key = parts[0];
                const value = parts.slice(1).join(':');
                listItems.push(
                    <li key={i} className="flex flex-wrap items-baseline list-none ml-4">
                        <span className="font-semibold text-slate-800 mr-2">{key}:</span>
                        <span className="text-slate-600">{value.trim()}</span>
                    </li>
                );
            } else {
                 listItems.push(
                    <li key={i} className="ml-8 list-disc text-slate-600">
                        <span>{content}</span>
                        {videoMatch && (
                            <a href={videoMatch[1]} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline ml-2 font-medium transition-colors">
                                [Video]
                            </a>
                        )}
                    </li>
                );
            }
        } else if (line === '---') {
            flushList();
            components.push(<hr key={i} className="my-8 border-slate-300" />);
        } else {
            flushList();
            components.push(<p key={i} className="text-slate-600 mb-2">{line}</p>);
        }
    });

    flushList(); // Add any remaining list items at the end
    return components;
};

export const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan }) => {
  return (
    <div className="bg-white p-8 sm:p-10 rounded-lg shadow-lg border border-slate-200 mt-8 prose prose-slate max-w-none">
      {renderPlan(plan)}
    </div>
  );
};
