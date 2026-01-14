interface DirectAnswerBlockProps {
  content: string;
}

const DirectAnswerBlock = ({ content }: DirectAnswerBlockProps) => {
  if (!content) return null;

  return (
    <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
      <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
        {content}
      </p>
    </div>
  );
};

export default DirectAnswerBlock;
