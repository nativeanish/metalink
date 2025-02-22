import { useState, useEffect } from "react"
const useTextScramble = (text: string, pauseDuration: number) => {
    const [displayText, setDisplayText] = useState(text)
    const [isScrambling, setIsScrambling] = useState(true)

    useEffect(() => {
        let intervalId: NodeJS.Timeout
        let timeoutId: NodeJS.Timeout

        const scrambleText = () => {
            setIsScrambling(true)
            let iteration = 0
            clearInterval(intervalId)

            intervalId = setInterval(() => {
                setDisplayText((prevText) =>
                    prevText
                        .split("")
                        .map((_, index) => {
                            if (index < iteration) {
                                return text[index]
                            }
                            return String.fromCharCode(65 + Math.floor(Math.random() * 26))
                        })
                        .join(""),
                )

                if (iteration >= text.length) {
                    clearInterval(intervalId)
                    setIsScrambling(false)
                    timeoutId = setTimeout(scrambleText, pauseDuration)
                }

                iteration += 1 / 3
            }, 30)
        }

        scrambleText()

        return () => {
            clearInterval(intervalId)
            clearTimeout(timeoutId)
        }
    }, [text, pauseDuration])

    return { displayText, isScrambling }
}

export default useTextScramble

