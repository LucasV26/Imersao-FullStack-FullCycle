type ButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
    return (
        <button 
            type="submit" 
            className="font-bold py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-800"
            { ...props }>
            { props.children }
        </button>
    );
};