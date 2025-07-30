import style from "./loader.module.css";

const Loader = () => {
  return (
    <div className={style.loader_wrapper}>
      <div className={style.custom_loader}></div>
    </div>
  );
};

export default Loader;
