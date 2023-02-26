export type TitleProps = {
  title?: string;
};

function Title({ title }: TitleProps): JSX.Element {
  return <title>{`${title ? `${title} - ` : ""}WOZ`}</title>;
}

export default Title;
