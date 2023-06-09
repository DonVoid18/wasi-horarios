import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
const ContainerCruces = ({ data }) => {
  const convertHour = (time) => {
    const hour = Math.floor(time / 60);
    const minute = time % 60;
    return `${hour}h ${minute}m`;
  };
  return (
    <div className="pt-10">
      <div className="pb-3">
        <h2 className="flex items-center gap-3 font-bold rounded-md text-2xl">
          <span>
            <FontAwesomeIcon icon={faBullhorn} />
          </span>
          <p>Cruce de horarios</p>
        </h2>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {data.map((value, index) => (
          <div key={index} className="flex h-28 bg-[#e9ecef] rounded-md">
            <div className="w-3/5 flex flex-col">
              <div className="flex justify-center items-center h-2/4 text-center border-b-2 border-r-2 px-2 border-white">
                <p className="line-clamp-2 font-medium">{value.c1}</p>
              </div>
              <div className="flex justify-center items-center h-2/4 text-center border-r-2 border-white px-2">
                <p className="line-clamp-2 font-medium">{value.c2}</p>
              </div>
            </div>
            <div className="flex justify-center items-center w-2/5">
              <p className="font-medium text-lg">{convertHour(value.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ContainerCruces;
