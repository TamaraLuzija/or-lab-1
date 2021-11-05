--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: product; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name text,
    short_description text,
    main_image text,
    images text,
    description text,
    price integer,
    stock integer,
    raiting real,
    created_at timestamp without time zone,
    shop_id integer NOT NULL
);


ALTER TABLE public.product OWNER TO dev;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO dev;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: shop; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.shop (
    id integer NOT NULL,
    slug text,
    name text,
    description text,
    background_image text,
    address text,
    contact text,
    rating double precision,
    timezone text,
    created_at timestamp without time zone
);


ALTER TABLE public.shop OWNER TO dev;

--
-- Name: shop_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.shop_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shop_id_seq OWNER TO dev;

--
-- Name: shop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.shop_id_seq OWNED BY public.shop.id;


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: shop id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.shop ALTER COLUMN id SET DEFAULT nextval('public.shop_id_seq'::regclass);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: shop shop_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.shop
    ADD CONSTRAINT shop_pkey PRIMARY KEY (id);


--
-- Name: product product_shop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_shop_id_fkey FOREIGN KEY (shop_id) REFERENCES public.shop(id);


--
-- PostgreSQL database dump complete
--

