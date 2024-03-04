def add(first, second):
    while (second != 0):
        carry = first & second
        first = first ^ second
        second = carry << 1
    return first
