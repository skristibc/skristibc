import { useState } from "react";


export default function DeleteButton({label, onDelete}){
    
    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return(
            <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
                <div className="bg-gray-300 p-4 rounded-lg">
                <div>Biztosan törölni szeretnéd ?</div>
                <div className="flex gap-2 mt-2">
                <button type="button" onClick={() => setShowConfirm(false)} >
                    Mégse
                </button>
                <button type="button" 
                    onClick={onDelete}
                    className="primary">
                    Törlés!
                </button>
                </div>
            </div>
            </div>
        );
    }

    return(
        <button type="button" onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    );
}