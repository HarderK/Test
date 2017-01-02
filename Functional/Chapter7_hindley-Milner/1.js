// reverse :: [a] -> [a]


// head :: [a] -> a
compose(f, head) = compose(head, map(f));

// filter :: (a -> Bool) -> [a] -> [b]
compose(map(f), filter(compose(p, f))) == compose(filter(p), map(f));