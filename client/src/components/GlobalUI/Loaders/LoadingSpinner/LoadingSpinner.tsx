type Props = {
  className?: string;
};

const LoadingSpinner = ({ className }: Props) => {
  return (
    <div className={className}>
      <div>
        <span className="loader" role="status" aria-label="Loading"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
