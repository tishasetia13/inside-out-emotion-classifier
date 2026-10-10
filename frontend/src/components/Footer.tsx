import './Footer.css'

// One quiet line with the project links.
export function Footer() {
  return (
    <footer className="footer">
      <p>
        <a
          href="https://github.com/tishasetia13/inside-out-emotion-classifier"
          target="_blank"
          rel="noreferrer"
        >
          Source on GitHub
        </a>
        <span aria-hidden="true"> · </span>
        <a
          href="https://huggingface.co/tishasetia13/inside-out-emotion-classifier"
          target="_blank"
          rel="noreferrer"
        >
          Model on Hugging Face
        </a>
      </p>
    </footer>
  )
}
