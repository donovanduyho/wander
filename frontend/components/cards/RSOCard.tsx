interface Props {
    name: string;
}

const RSOCard = ({ name }: Props) => {
    return <h2>{name}</h2>;
};

export default RSOCard;
