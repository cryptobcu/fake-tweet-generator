import React, { useState, createRef, useEffect } from 'react';
import './index.scss';
import {
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  ShareIcon,
  VerifiedIcon
} from './icons';
import  AvatarLoader  from './loader';
import { useScreenshot } from 'use-react-screenshot';
import { language } from './language';

const tweetFormat = tweet => {
  tweet = tweet
    .replace(/@([\w]+)/g, '<span>@$1</span>')
    .replace(/#([\wşçöğüıİ]+)/gi, '<span>#$1</span>')
    .replace(/(https?:\/\/[\w\.\/]+)/, '<span>$1</span>')
    .replace(/\n/g, '<br />');
  return tweet;
};

const formatNumber = number => {
  if (!number) {
    number = 0;
  }
  if (number < 1000) {
    return number;
  }
  number /= 1000;
  number = String(number).split('.');

  return (
    number[0] + (number[1] > 100 ? ',' + number[1].slice(0, 1) + ' B' : ' B')
  );
};

export default function App() {
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isVerified, setIsVerified] = useState(0);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [lang, setLang] = useState('tr');
  const [image, takeScreenshot] = useScreenshot();
  const [langText, setLangText] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const getImage = () => takeScreenshot(tweetRef.current);

  useEffect(() => {
    setLangText(language[lang]);
  }, [lang]);

  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
  }, [image]);

  const avatarHandle = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="tweet-settings">
        <h3>{langText?.settings}</h3>
        <ul>
          <li>
            <label>{langText?.name}</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.username}</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label>Tweet</label>
            <textarea
              class="textarea"
              maxLength="290"
              value={tweet}
              onChange={e => setTweet(e.target.value)}
            />
          </li>
          <li>
            <label>Avatar</label>
            <input type="file" className="input" onChange={avatarHandle} />
          </li>
          <li>
            <label>Görüntülenme</label>
            <input
              type="number"
              className="input"
              value={views}
              onChange={e => setViews(e.target.value)}
            />
          </li>
          <li>
            <label>Retweet</label>
            <input
              type="number"
              className="input"
              value={retweets}
              onChange={e => setRetweets(e.target.value)}
            />
          </li>
          <li>
            <label>Alıntı Tweetler</label>
            <input
              type="number"
              className="input"
              value={quoteTweets}
              onChange={e => setQuoteTweets(e.target.value)}
            />
          </li>
          <li>
            <label>Beğeni</label>
            <input
              type="number"
              className="input"
              value={likes}
              onChange={e => setLikes(e.target.value)}
            />
          </li>
          <li>
            <label>Saat</label>
            <input
              type="number"
              className="input"
              value={hour}
              onChange={e => setHour(e.target.value)}
            />
          </li>
          <li>
            <label>Dakika</label>
            <input
              type="number"
              className="input"
              value={minute}
              onChange={e => setMinute(e.target.value)}
            />
          </li>
          <li>
            <label>Gün</label>
            <input
              type="number"
              className="input"
              value={day}
              onChange={e => setDay(e.target.value)}
            />
          </li>
          <li>
            <label>Ay</label>
            <input
              type="text"
              className="input"
              value={month}
              onChange={e => setMonth(e.target.value)}
            />
          </li>
          <li>
            <label>Yıl</label>
            <input
              type="number"
              className="input"
              value={year}
              onChange={e => setYear(e.target.value)}
            />
          </li>
          <li>
            <label>Doğrulanmış Hesap</label>
            <select
              onChange={e => setIsVerified(e.target.value)}
              defaultValue={isVerified}
            >
              <option value="2">Sarı Tik</option>
              <option value="1">Evet</option>
              <option value="0">Hayır</option>
            </select>
          </li>
          <button onClick={getImage}>Oluştur</button>
          <div className="download-url">
            {image && (
              <a ref={downloadRef} href={image} download="tweet.png">
                Tweeti İndir
              </a>
            )}
          </div>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="app-language">
          <span
            onClick={() => setLang('tr')}
            className={lang === 'tr' && 'active'}
          >
            Türkçe
          </span>
          <span
            onClick={() => setLang('en')}
            className={lang === 'en' && 'active'}
          >
            English
          </span>
        </div>
        <div className="tweet" ref={tweetRef}>
          <div className="tweet-author">
            {(avatar && <img src={avatar} />) || <AvatarLoader />}
            <div>
              <div className="name">
                <span>{name || 'Ad Soyad'}</span>
                {isVerified == 1 && <VerifiedIcon width="19" height="19" />}
                {isVerified == 2 && <VerifiedIcon width="19" height="19" color="#E6BF29" />}
              </div>
              <div className="username">@{username || 'kullaniciadi'}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  (tweet && tweetFormat(tweet)) ||
                  'Bu alana örnek tweet gelecek'
              }}
            />
          </div>
          <div className="tweet-time">
            {
              hour >= 12
              ? `ÖS ${hour}:${minute} · ${day} ${month} ${year} `
              : `ÖÖ ${hour}:${minute} · ${day} ${month} ${year}`
            }
          </div>
          <div className="tweet-stats">
            <span>
              <b>{formatNumber(views)}</b> Görüntülenme
            </span>
            <span>
              <b>{formatNumber(retweets)}</b> Retweet
            </span>
            <span>
              <b>{formatNumber(quoteTweets)}</b> Alıntı Tweetler
            </span>
            <span>
              <b>{formatNumber(likes)}</b> Beğeni
            </span>
          </div>
          <div className="tweet-actions">
            <span>
              <ReplyIcon />
            </span>
            <span>
              <RetweetIcon />
            </span>
            <span>
              <LikeIcon />
            </span>
            <span>
              <ShareIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};