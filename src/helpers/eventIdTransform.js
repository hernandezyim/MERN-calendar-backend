const eventIdTransform = ({ _doc }) => {
  const { _id, ...resEvent } = _doc;
  resEvent.id = _id;

  return resEvent;
};

export default eventIdTransform;
