const ShareHeader = ({header, subHeader}) => {
    return (
        <div className="w-8/12 m-auto border-y-2 py-3 text-center">
            <h1 className="text-3xl font-bold mb-2">{header}</h1>
            <p>{subHeader}</p>
        </div>
    );
};

export default ShareHeader;