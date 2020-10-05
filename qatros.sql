--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: get_random_string(integer, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_random_string(string_length integer, possible_chars text DEFAULT '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'::text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
    output TEXT = '';
    i INT4;
    pos INT4;
BEGIN
    FOR i IN 1..string_length LOOP
        pos := 1 + CAST( random() * ( LENGTH(possible_chars) - 1) AS INT4 );
        output := output || substr(possible_chars, pos, 1);
    END LOOP;
    RETURN output;
END;
$$;


ALTER FUNCTION public.get_random_string(string_length integer, possible_chars text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    code text DEFAULT public.get_random_string(12) NOT NULL,
    name character varying(50) NOT NULL,
    description text
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (code, name, description) FROM stdin;
DsHQoHADVvER	Casio G-Shock Original GA-700-1A	Salah satu jam tangan yang masuk dalam jajaran best seller dan unggulan di Machtwatch, ia adalah G-Shock GA-700. Sangat digemari dan cocok digunakan dengan outfit apapun. Didesain untuk kamu yang berjiwa bebas, dinamis, fun, dan aktif.
JX26mUZ6wJ7j	ROLEX OYSTER PERPETUAL 34 OYSTER STEEL	SILVER WITH LUMINOUS SILVER-TONE HANDS AND INDEX HOUR MARKERS, ARABIC NUMERALS MARK THE 3,6 AND 9 O'CLOCK POSITION
vJyPLW0JmhlG	Rolex 116618 Submariner Yellow	Monobloc middle case, screw-down case back and winding crown
Mf733mqRotxS	Alba AS9D07X1 Men Black Blue Dial	Water Resistant 10 ATM
\.


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (code);


--
-- PostgreSQL database dump complete
--

