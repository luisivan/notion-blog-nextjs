export const Bookmark = ({ title, description, icon, image, url }) => (
  <a
    href={url}
    className="flex flex-row border border-solid border-gray-200 mt-4 mb-8"
  >
    <div className="basis-3/4 whitespace-nowrap text-ellipsis overflow-hidden p-4">
      <div className="text-sm text-gray-800 mb-2 whitespace-nowrap text-ellipsis overflow-hidden">
        {title}
      </div>
      <div className="text-xs text-gray-400 mb-2 whitespace-nowrap text-ellipsis overflow-hidden">
        {description}
      </div>
      <div className="flex flex-row items-center">
        <img
          src={icon}
          width={16}
          height={16}
          style={{ margin: 0 }}
          alt={`Icon from ${url}`}
        />
        <span className="text-xs text-gray-600 no-underline ml-2 whitespace-nowrap text-ellipsis overflow-hidden">
          {url}
        </span>
      </div>
    </div>
    <div
      className="basis-1/4 grow bg-[length:120%] bg-center ml-8 min-w-[30%]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
  </a>
)
