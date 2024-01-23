interface EditButtonProps {
    onClick: () => void;
}

export default function EditWatchListButton({ onClick }: EditButtonProps) {

    return (
        <>
            <button onClick={onClick}>
                Edit
            </button>
        </>
    )
}