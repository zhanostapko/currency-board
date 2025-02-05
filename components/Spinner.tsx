type Props = {
  size?: number;
};
const Spinner = ({ size = 36 }: Props) => {
  return (
    <div className={`flex justify-center items-center `}>
      <div
        style={{ width: size, height: size, borderWidth: size / 8 }}
        className={` border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
