import { FormControlCaptionProps } from "./form-control-caption.props";

export default function FormControlCaption({
  error = "",
  name = "",
}: FormControlCaptionProps) {
  const content = error?.trim() ? (
    <div className="mt-1 text-12-500 text-red-400" data-cy={`error-${name}`}>
      {error}
    </div>
  ) : null;

  return <>{content}</>;
}
