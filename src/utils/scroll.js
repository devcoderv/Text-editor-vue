export const scrollDirection = (scrollTop, currentTop) => {
    const direction = scrollTop > currentTop ? 'down' : 'up';
    return direction

}