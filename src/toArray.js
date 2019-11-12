export default collection =>  {
    if(Array.isArray(collection))
        return collection;
    else if(collection && typeof collection.length === 'number')
        return [].slice.call(collection);
    else
        return [collection];
};