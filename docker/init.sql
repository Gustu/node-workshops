CREATE TABLE tweet
(
    tweet_id UUID PRIMARY KEY,
    writer_id UUID NOT NULL,
    message TEXT NOT NULL CHECK (char_length(message) > 0 AND char_length(message) <= 255),
    created_at DATE DEFAULT NOW()
);

CREATE TABLE account (
    account_id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    hash TEXT NOT NULL,
    created_at DATE DEFAULT NOW()
);