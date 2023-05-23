function areSetsEqual(set1, set2) {
    if (set1.size !== set2.size) {
        return false;
    }

    for (const element of set1) {
        if (!set2.has(element)) {
            return false;
        }
    }

    return true;
}

export default function areFeedsDiff(feed1, feed2) {
    if (!feed1) return false

    const set1 = new Set()
    feed1.items.map(item => {
        set1.add(item.title)
    })

    const set2 = new Set()
    feed2.items.map(item => {
        set2.add(item.title)
    })

    if (areSetsEqual(set1, set2)) {
        console.log("No change in feed content")
        return false
    } else {
        console.log("Change in feed content")
        return true
    }
}