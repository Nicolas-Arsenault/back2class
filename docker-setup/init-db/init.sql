--
-- PostgreSQL database dump
--

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 17.5

-- Started on 2025-10-01 21:12:07 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_sender_id_fkey;
ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_chat_id_fkey;
ALTER TABLE ONLY public.listings DROP CONSTRAINT listings_user_id_fkey;
ALTER TABLE ONLY public.listings DROP CONSTRAINT listings_category_id_fkey;
ALTER TABLE ONLY public.listingimages DROP CONSTRAINT listingimages_listing_id_fkey;
ALTER TABLE ONLY public.chats DROP CONSTRAINT chats_seller_id_fkey;
ALTER TABLE ONLY public.chats DROP CONSTRAINT chats_listing_id_fkey;
ALTER TABLE ONLY public.chats DROP CONSTRAINT chats_buyer_id_fkey;
DROP INDEX public.idx_messages_chat_sent;
DROP INDEX public.idx_listings_created_at;
DROP INDEX public.idx_listings_category;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
ALTER TABLE ONLY public.listings DROP CONSTRAINT listings_pkey;
ALTER TABLE ONLY public.listingimages DROP CONSTRAINT listingimages_pkey;
ALTER TABLE ONLY public.chats DROP CONSTRAINT chats_pkey;
ALTER TABLE ONLY public.chats DROP CONSTRAINT chats_listing_id_buyer_id_seller_id_key;
ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_name_key;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
ALTER TABLE public.listings ALTER COLUMN listing_id DROP DEFAULT;
ALTER TABLE public.listingimages ALTER COLUMN image_id DROP DEFAULT;
ALTER TABLE public.chats ALTER COLUMN chat_id DROP DEFAULT;
ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.messages_message_id_seq;
DROP TABLE public.messages;
DROP SEQUENCE public.listings_listing_id_seq;
DROP TABLE public.listings;
DROP SEQUENCE public.listingimages_image_id_seq;
DROP TABLE public.listingimages;
DROP SEQUENCE public.chats_chat_id_seq;
DROP TABLE public.chats;
DROP SEQUENCE public.categories_category_id_seq;
DROP TABLE public.categories;
DROP SCHEMA public;
--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16415)
-- Name: categories; Type: TABLE; Schema: public; Owner: ucatuser
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.categories OWNER TO ucatuser;

--
-- TOC entry 216 (class 1259 OID 16414)
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: ucatuser
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_category_id_seq OWNER TO ucatuser;

--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 216
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ucatuser
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- TOC entry 223 (class 1259 OID 16496)
-- Name: chats; Type: TABLE; Schema: public; Owner: ucatuser
--

CREATE TABLE public.chats (
    chat_id integer NOT NULL,
    listing_id integer NOT NULL,
    buyer_id integer NOT NULL,
    seller_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.chats OWNER TO ucatuser;

--
-- TOC entry 222 (class 1259 OID 16495)
-- Name: chats_chat_id_seq; Type: SEQUENCE; Schema: public; Owner: ucatuser
--

CREATE SEQUENCE public.chats_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chats_chat_id_seq OWNER TO ucatuser;

--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 222
-- Name: chats_chat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ucatuser
--

ALTER SEQUENCE public.chats_chat_id_seq OWNED BY public.chats.chat_id;


--
-- TOC entry 221 (class 1259 OID 16481)
-- Name: listingimages; Type: TABLE; Schema: public; Owner: ucatuser
--

CREATE TABLE public.listingimages (
    image_id integer NOT NULL,
    listing_id integer NOT NULL,
    image_url text NOT NULL,
    order_index integer DEFAULT 0
);


ALTER TABLE public.listingimages OWNER TO ucatuser;

--
-- TOC entry 220 (class 1259 OID 16480)
-- Name: listingimages_image_id_seq; Type: SEQUENCE; Schema: public; Owner: ucatuser
--

CREATE SEQUENCE public.listingimages_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.listingimages_image_id_seq OWNER TO ucatuser;

--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 220
-- Name: listingimages_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ucatuser
--

ALTER SEQUENCE public.listingimages_image_id_seq OWNED BY public.listingimages.image_id;


--
-- TOC entry 219 (class 1259 OID 16456)
-- Name: listings; Type: TABLE; Schema: public; Owner: ucatuser
--

CREATE TABLE public.listings (
    listing_id integer NOT NULL,
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    price numeric(10,2),
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    is_sold boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.listings OWNER TO ucatuser;

--
-- TOC entry 218 (class 1259 OID 16455)
-- Name: listings_listing_id_seq; Type: SEQUENCE; Schema: public; Owner: ucatuser
--

CREATE SEQUENCE public.listings_listing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.listings_listing_id_seq OWNER TO ucatuser;

--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 218
-- Name: listings_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ucatuser
--

ALTER SEQUENCE public.listings_listing_id_seq OWNED BY public.listings.listing_id;


--
-- TOC entry 225 (class 1259 OID 16521)
-- Name: messages; Type: TABLE; Schema: public; Owner: ucatuser
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    chat_id integer NOT NULL,
    sender_id integer NOT NULL,
    content text,
    attachment_url text,
    sent_at timestamp without time zone DEFAULT now(),
    read_at timestamp without time zone
);


ALTER TABLE public.messages OWNER TO ucatuser;

--
-- TOC entry 224 (class 1259 OID 16520)
-- Name: messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: ucatuser
--

CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_message_id_seq OWNER TO ucatuser;

--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 224
-- Name: messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ucatuser
--

ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;


--
-- TOC entry 215 (class 1259 OID 16386)
-- Name: users; Type: TABLE; Schema: public; Owner: ucatuser
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255),
    email_verified boolean DEFAULT false,
    magic_token character varying(255),
    magic_token_expiry timestamp without time zone,
    last_magic_link_sent_at timestamp without time zone,
    reset_token character varying(255),
    reset_token_expiry timestamp without time zone,
    last_password_reset_requested_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO ucatuser;

--
-- TOC entry 214 (class 1259 OID 16385)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ucatuser
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO ucatuser;

--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ucatuser
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3290 (class 2604 OID 16418)
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- TOC entry 3298 (class 2604 OID 16499)
-- Name: chats chat_id; Type: DEFAULT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.chats ALTER COLUMN chat_id SET DEFAULT nextval('public.chats_chat_id_seq'::regclass);


--
-- TOC entry 3296 (class 2604 OID 16484)
-- Name: listingimages image_id; Type: DEFAULT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.listingimages ALTER COLUMN image_id SET DEFAULT nextval('public.listingimages_image_id_seq'::regclass);


--
-- TOC entry 3291 (class 2604 OID 16459)
-- Name: listings listing_id; Type: DEFAULT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.listings ALTER COLUMN listing_id SET DEFAULT nextval('public.listings_listing_id_seq'::regclass);


--
-- TOC entry 3300 (class 2604 OID 16524)
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);


--
-- TOC entry 3288 (class 2604 OID 16403)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3478 (class 0 OID 16415)
-- Dependencies: 217
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: ucatuser
--

COPY public.categories (category_id, name) FROM stdin;
\.


--
-- TOC entry 3484 (class 0 OID 16496)
-- Dependencies: 223
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: ucatuser
--

COPY public.chats (chat_id, listing_id, buyer_id, seller_id, created_at) FROM stdin;
\.


--
-- TOC entry 3482 (class 0 OID 16481)
-- Dependencies: 221
-- Data for Name: listingimages; Type: TABLE DATA; Schema: public; Owner: ucatuser
--

COPY public.listingimages (image_id, listing_id, image_url, order_index) FROM stdin;
\.


--
-- TOC entry 3480 (class 0 OID 16456)
-- Dependencies: 219
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: ucatuser
--

COPY public.listings (listing_id, user_id, category_id, title, description, price, status, is_sold, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3486 (class 0 OID 16521)
-- Dependencies: 225
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: ucatuser
--

COPY public.messages (message_id, chat_id, sender_id, content, attachment_url, sent_at, read_at) FROM stdin;
\.


--
-- TOC entry 3476 (class 0 OID 16386)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ucatuser
--

COPY public.users (id, username, email, password, email_verified, magic_token, magic_token_expiry, last_magic_link_sent_at, reset_token, reset_token_expiry, last_password_reset_requested_at) FROM stdin;
\.


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 216
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ucatuser
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 1, false);


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 222
-- Name: chats_chat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ucatuser
--

SELECT pg_catalog.setval('public.chats_chat_id_seq', 1, false);


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 220
-- Name: listingimages_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ucatuser
--

SELECT pg_catalog.setval('public.listingimages_image_id_seq', 1, false);


--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 218
-- Name: listings_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ucatuser
--

SELECT pg_catalog.setval('public.listings_listing_id_seq', 1, false);


--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 224
-- Name: messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ucatuser
--

SELECT pg_catalog.setval('public.messages_message_id_seq', 1, false);


--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ucatuser
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- TOC entry 3309 (class 2606 OID 16422)
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- TOC entry 3311 (class 2606 OID 16420)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 3319 (class 2606 OID 16504)
-- Name: chats chats_listing_id_buyer_id_seller_id_key; Type: CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_listing_id_buyer_id_seller_id_key UNIQUE (listing_id, buyer_id, seller_id);


--
-- TOC entry 3321 (class 2606 OID 16502)
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (chat_id);


--
-- TOC entry 3317 (class 2606 OID 16489)
-- Name: listingimages listingimages_pkey; Type: CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.listingimages
    ADD CONSTRAINT listingimages_pkey PRIMARY KEY (image_id);


--
-- TOC entry 3315 (class 2606 OID 16467)
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (listing_id);


--
-- TOC entry 3324 (class 2606 OID 16529)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- TOC entry 3303 (class 2606 OID 16398)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3305 (class 2606 OID 16405)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3307 (class 2606 OID 16396)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3312 (class 1259 OID 16478)
-- Name: idx_listings_category; Type: INDEX; Schema: public; Owner: ucatuser
--

CREATE INDEX idx_listings_category ON public.listings USING btree (category_id);


--
-- TOC entry 3313 (class 1259 OID 16479)
-- Name: idx_listings_created_at; Type: INDEX; Schema: public; Owner: ucatuser
--

CREATE INDEX idx_listings_created_at ON public.listings USING btree (created_at DESC);


--
-- TOC entry 3322 (class 1259 OID 16540)
-- Name: idx_messages_chat_sent; Type: INDEX; Schema: public; Owner: ucatuser
--

CREATE INDEX idx_messages_chat_sent ON public.messages USING btree (chat_id, sent_at);


--
-- TOC entry 3328 (class 2606 OID 16510)
-- Name: chats chats_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3329 (class 2606 OID 16505)
-- Name: chats chats_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(listing_id) ON DELETE CASCADE;


--
-- TOC entry 3330 (class 2606 OID 16515)
-- Name: chats chats_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3327 (class 2606 OID 16490)
-- Name: listingimages listingimages_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.listingimages
    ADD CONSTRAINT listingimages_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(listing_id) ON DELETE CASCADE;


--
-- TOC entry 3325 (class 2606 OID 16473)
-- Name: listings listings_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON DELETE RESTRICT;


--
-- TOC entry 3326 (class 2606 OID 16468)
-- Name: listings listings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3331 (class 2606 OID 16530)
-- Name: messages messages_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(chat_id) ON DELETE CASCADE;


--
-- TOC entry 3332 (class 2606 OID 16535)
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ucatuser
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-10-01 21:12:08 EDT

--
-- PostgreSQL database dump complete
--

