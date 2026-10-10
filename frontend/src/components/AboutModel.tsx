import './AboutModel.css'

// A quiet disclosure with the model's honest limitations in plain language.
export function AboutModel() {
  return (
    <details className="about">
      <summary className="about__summary">About this model</summary>
      <div className="about__body">
        <p>
          A DistilBERT model fine-tuned on ISEAR, a dataset of short personal stories. It
          classifies text into five emotions and was about 76% accurate on its test set,
          against about 67% for a simple keyword baseline.
        </p>
        <ul>
          <li>
            It knows only five emotions and has no neutral class, so calm or neutral text
            is often pushed toward joy, sometimes with high confidence.
          </li>
          <li>
            Long stories are split into pieces and the results averaged, which can turn a
            clear story into a near tie.
          </li>
          <li>Each piece is read up to about 64 tokens, which is a few sentences.</li>
          <li>High confidence does not mean the answer is correct.</li>
          <li>
            It was trained only on short personal stories, so other kinds of writing may
            confuse it.
          </li>
          <li>Stories are never stored.</li>
        </ul>
        <p className="about__links">
          <a
            href="https://github.com/tishasetia13/inside-out-emotion-classifier"
            target="_blank"
            rel="noreferrer"
          >
            GitHub repository
          </a>
          <a
            href="https://huggingface.co/tishasetia13/inside-out-emotion-classifier"
            target="_blank"
            rel="noreferrer"
          >
            Hugging Face model
          </a>
        </p>
      </div>
    </details>
  )
}
