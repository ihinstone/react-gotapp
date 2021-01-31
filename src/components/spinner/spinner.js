import './spinner.css';

export const Spinner = () => {
    return (
        <div className="lds-css ng-scope">
            <div className="lds-spin"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
        </div>
    )
}