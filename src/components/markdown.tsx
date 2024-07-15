import ReactMarkdown from "react-markdown";

interface Props {
  children: string;
}

export default function Markdown({ children }: Props) {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        ul: (props) => <ul {...props} className="list-inside list-disc" />,
        a: (props) => (
          <a {...props} className="text-green-500 underline" target="_blank" />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
