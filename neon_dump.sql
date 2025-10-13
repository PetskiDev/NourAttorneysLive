--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (6bc9ef8)
-- Dumped by pg_dump version 18.0 (Ubuntu 18.0-1.pgdg22.04+3)

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

--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


--
-- Name: BlockType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE "public"."BlockType" AS ENUM (
    'TEXT',
    'IMAGE',
    'VIDEO',
    'HTML'
);


--
-- Name: FooterCategory; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE "public"."FooterCategory" AS ENUM (
    'SOCIAL',
    'NAVIGATION',
    'CONTACTS'
);


--
-- Name: FooterTextKey; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE "public"."FooterTextKey" AS ENUM (
    'LOCATION',
    'WORKING_HOURS'
);


--
-- Name: InsightCategory; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE "public"."InsightCategory" AS ENUM (
    'ARTICLES',
    'NEWS',
    'UPDATES',
    'PUBLICATIONS'
);


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: Block; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."Block" (
    "id" "text" NOT NULL,
    "pageRelUrl" "text" NOT NULL,
    "key" "text" NOT NULL,
    "blockType" "public"."BlockType" NOT NULL,
    "content" "text" NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "elementTag" "text"
);


--
-- Name: DynamicPage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."DynamicPage" (
    "id" "text" NOT NULL,
    "title" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Expertise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."Expertise" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Expertise_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."Expertise_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Expertise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."Expertise_id_seq" OWNED BY "public"."Expertise"."id";


--
-- Name: FooterLink; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."FooterLink" (
    "id" integer NOT NULL,
    "category" "public"."FooterCategory" NOT NULL,
    "label" "text" NOT NULL,
    "href" "text" NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: FooterLink_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."FooterLink_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: FooterLink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."FooterLink_id_seq" OWNED BY "public"."FooterLink"."id";


--
-- Name: FooterText; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."FooterText" (
    "key" "public"."FooterTextKey" NOT NULL,
    "value" "text" NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Insight; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."Insight" (
    "id" integer NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "category" "public"."InsightCategory" NOT NULL,
    "publisher" "text" NOT NULL,
    "imageUrl" "text",
    "publishedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Insight_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."Insight_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Insight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."Insight_id_seq" OWNED BY "public"."Insight"."id";


--
-- Name: Partner; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."Partner" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "industry" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "order" integer DEFAULT 0 NOT NULL
);


--
-- Name: Partner_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."Partner_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Partner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."Partner_id_seq" OWNED BY "public"."Partner"."id";


--
-- Name: People; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."People" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "role" "text" NOT NULL,
    "imageUrl" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "order" integer DEFAULT 0 NOT NULL
);


--
-- Name: People_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."People_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: People_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."People_id_seq" OWNED BY "public"."People"."id";


--
-- Name: Service; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."Service" (
    "id" integer NOT NULL,
    "expertiseId" integer NOT NULL,
    "title" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Service_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."Service_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."Service_id_seq" OWNED BY "public"."Service"."id";


--
-- Name: Expertise id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Expertise" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Expertise_id_seq"'::"regclass");


--
-- Name: FooterLink id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."FooterLink" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."FooterLink_id_seq"'::"regclass");


--
-- Name: Insight id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Insight" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Insight_id_seq"'::"regclass");


--
-- Name: Partner id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Partner" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Partner_id_seq"'::"regclass");


--
-- Name: People id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."People" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."People_id_seq"'::"regclass");


--
-- Name: Service id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Service" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Service_id_seq"'::"regclass");


--
-- Data for Name: Block; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."Block" ("id", "pageRelUrl", "key", "blockType", "content", "updatedAt", "elementTag") FROM stdin;
cfffd9df-7780-4f58-a230-fff7b9c520f9	/frameworks-template	framework-image-3	IMAGE	https://utfs.io/f/SphMQKZarB13o7GkG7HCfeEcOup6dUm3v1zTWVjwayNnqIxr	2025-10-06 17:25:33.553	\N
\.


--
-- Data for Name: DynamicPage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."DynamicPage" ("id", "title", "slug", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Expertise; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."Expertise" ("id", "title", "createdAt", "updatedAt") FROM stdin;
1	DRAFTING CONRACT	2025-08-09 16:30:05.955	2025-08-21 20:47:12.737
2	COURT LITIGATION	2025-08-09 16:30:52.138	2025-10-08 11:29:12.896
\.


--
-- Data for Name: FooterLink; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."FooterLink" ("id", "category", "label", "href", "order", "createdAt", "updatedAt") FROM stdin;
21	NAVIGATION	Contacts	/contact	5	2025-08-21 20:42:31.891	2025-08-21 20:42:31.891
22	NAVIGATION	Case status	/case-status	6	2025-08-21 20:42:44.785	2025-08-21 20:42:44.785
15	SOCIAL	LinkedIn	https://www.linkedin.com	0	2025-08-13 12:43:04.958	2025-10-08 11:28:44.157
16	SOCIAL	Instagram	https://www.instagram.com/	1	2025-08-13 12:43:31.608	2025-10-08 11:28:44.157
17	SOCIAL	Twitter/X	https://x.com/	2	2025-08-13 12:44:41.764	2025-10-08 11:28:44.157
18	SOCIAL	Youtube	https://youtube.com	3	2025-08-13 12:44:55.566	2025-10-08 11:28:44.157
10	NAVIGATION	About Us	/about-us	0	2025-08-13 12:38:18.236	2025-08-14 14:08:03.038
11	NAVIGATION	Expertise	/expertise	1	2025-08-13 12:38:25.774	2025-08-14 14:08:03.038
12	NAVIGATION	Our People	/people	2	2025-08-13 12:38:37.151	2025-08-14 14:08:03.038
13	NAVIGATION	ESG & Sustainability	/esg-sustainibility	3	2025-08-13 12:38:54.91	2025-08-14 14:08:03.038
14	NAVIGATION	Insights	/insights	4	2025-08-13 12:39:04.645	2025-08-14 14:08:03.038
\.


--
-- Data for Name: FooterText; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."FooterText" ("key", "value", "updatedAt") FROM stdin;
LOCATION	Office 402, Crystal Tower,\nBusiness Bay, Dubai, UAE	2025-08-14 14:33:18.635
WORKING_HOURS	Mon–Fri: 9am — 6pm	2025-08-14 14:38:49.237
\.


--
-- Data for Name: Insight; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."Insight" ("id", "slug", "title", "description", "category", "publisher", "imageUrl", "publishedAt", "createdAt", "updatedAt") FROM stdin;
10	newest	The newest insight is that there are new insights	The newest insight is that there are new insightsThe newest insight is that there are new insights	NEWS	Petre	https://utfs.io/f/SphMQKZarB13RztjBe12mZJeaD39Yf75gOnj6MIHQAs0uchw	2025-08-16 11:06:24.811	2025-08-16 11:06:51.719	2025-08-21 20:37:35.189
8	publiceee	This is a publication	This is a publication.This is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publicationThis is a publication	PUBLICATIONS	Publicer	https://utfs.io/f/SphMQKZarB13jXOeCsZErVJhmGR21fuo7LK9CXZgwtPMDx5n	2025-08-15 00:00:00	2025-08-14 12:05:57.769	2025-08-21 20:37:46.818
9	ppp	PUBLICATION	PUBLICATIONPUBLICATIONPUBLICATIONPUBLICATIONPUBLICATIONPUBLICATIONPUBLICATION	PUBLICATIONS	publi	https://utfs.io/f/SphMQKZarB13o7GkG7HCfeEcOup6dUm3v1zTWVjwayNnqIxr	2025-08-14 12:24:47.315	2025-08-14 12:25:03.748	2025-08-21 20:38:05.199
7	pere	Another? News?	Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?Another? News?	NEWS	pere	https://utfs.io/f/SphMQKZarB13jXOeCsZErVJhmGR21fuo7LK9CXZgwtPMDx5n	2025-08-14 12:04:54.619	2025-08-14 12:05:27.904	2025-08-21 20:38:14.853
6	yodater	Another Update	Another Update.Another Update.Another Update.Another Update.Another Update.Another Update.Another Update.Another Update.Another Update.Another Update.Another Update.Another Update.Another Update.Another Update.Another Update.	UPDATES	Upadater	https://utfs.io/f/SphMQKZarB13jXOeCsZErVJhmGR21fuo7LK9CXZgwtPMDx5n	2025-08-14 12:04:27.588	2025-08-14 12:04:53.184	2025-08-21 20:38:33.087
5	update	An Update	An Update.An Update.An Update.An Update.An Update.An Update.An Update.An Update.An Update.	UPDATES	Updater	https://utfs.io/f/SphMQKZarB13jXOeCsZErVJhmGR21fuo7LK9CXZgwtPMDx5n	2025-08-14 12:03:18.699	2025-08-14 12:03:47.277	2025-08-21 20:38:49.947
4	another-article	Another aricle	This is an aricle.This is an aricleThis is an aricleThis is an aricleThis is an aricleThis is an aricleThis is an aricleThis is an aricleThis is an aricleThis is an aricle	ARTICLES	Pere	https://utfs.io/f/SphMQKZarB13RztjBe12mZJeaD39Yf75gOnj6MIHQAs0uchw	2025-08-14 11:54:37.074	2025-08-14 11:55:12.379	2025-08-21 20:38:56.842
3	new-card	Something new	TGROUND BRAKING NEWS SISISI TGROUND BRAKING NEWS SISISI TGROUND BRAKING NEWS SISISI 	NEWS	Petre	https://utfs.io/f/SphMQKZarB13jXOeCsZErVJhmGR21fuo7LK9CXZgwtPMDx5n	2025-08-13 00:00:00	2025-08-12 12:16:04.816	2025-08-21 20:39:02.951
\.


--
-- Data for Name: Partner; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."Partner" ("id", "name", "slug", "industry", "createdAt", "updatedAt", "order") FROM stdin;
2	Transaction for Me	transaction-for-me	CSP & Government transactions processor specializing in document clearing, translations & PRO services	2025-08-14 13:03:08.947	2025-08-21 11:18:15.892	0
3	Nomou Properties	nomou-properties	real estate firm engaged in sales, acquisitions, commercial leasing, management of properties in UAE	2025-08-14 13:03:36.543	2025-08-21 11:18:15.892	1
4	Horizon	horizon	business consultant specialising overseeing franchises development and brand expansion within the F&B and other sectors	2025-08-14 13:03:59.658	2025-08-21 11:18:15.892	2
5	Smart Stack	smart-stack	accounting, bookkeeping, and tax consultancy firm providing comprehensive financial compliance services	2025-08-14 13:04:14.275	2025-08-21 11:18:15.892	3
6	Legend1st	legend1st	full-service marketing agency offering strategic Branding Solutions, Website Development and Social Media Marketing	2025-08-14 13:04:28.401	2025-08-21 11:18:15.892	4
\.


--
-- Data for Name: People; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."People" ("id", "name", "role", "imageUrl", "createdAt", "order") FROM stdin;
22	Jasmine Dear	legal consultant	https://utfs.io/f/SphMQKZarB13Hy6LfOCy4mMFhaQD2TXqlIWLiRcGeBj8fpbN	2025-08-21 20:09:14.02	2
23	amer kiwan	Sr. Legal Consultant / Litigator	https://utfs.io/f/SphMQKZarB13SorqsrarB13W7tz52mNKMhx0gcdk9LvsPER4	2025-08-21 20:09:37.321	3
24	Arslan Butt	Partner & Sr. Legal Consultant	https://utfs.io/f/SphMQKZarB13rN5wlJ7QwXP6FCnzAo8OZTxcjtGJyb3gdeLs	2025-08-21 20:09:54.457	4
25	Hiruni Perera	legal consultant	https://utfs.io/f/SphMQKZarB13tGUfvSiKZAvlBV9jrMyNuUJnS6ms3gXEIpkf	2025-08-21 20:10:09.755	5
20	Mohamed Noureldin	Founder, Managing Partner & Sr. legal consultant	https://utfs.io/f/SphMQKZarB13qTfSNrUPNpL2WQu73JX4IsgUijaOxoRkzwKm	2025-08-21 20:08:32.859	0
21	Ahmed Fakher	Partner & Sr. Legal Consultant	https://utfs.io/f/SphMQKZarB13Hy6LfOCy4mMFhaQD2TXqlIWLiRcGeBj8fpbN	2025-08-21 20:09:00.448	1
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."Service" ("id", "expertiseId", "title", "slug", "createdAt", "updatedAt") FROM stdin;
10	2	Courts Litigation Services	court-litigation-services	2025-08-21 20:45:31.168	2025-08-21 20:45:31.168
11	2	Pre-Dispute Management	pre-dispute-management	2025-08-21 20:45:56.14	2025-08-21 20:45:56.14
12	2	Orders on Petitions	orders	2025-08-21 20:46:03.407	2025-08-21 20:46:03.407
13	2	Banking Disputes	banking	2025-08-21 20:46:14.155	2025-08-21 20:46:14.155
14	2	Consumer Protection Disputes	cusumer	2025-08-21 20:46:22.037	2025-08-21 20:46:22.037
15	2	Criminal Case Representation	criminal	2025-08-21 20:46:34.006	2025-08-21 20:46:34.006
16	2	Commercial Disputes	commercial	2025-08-21 20:46:46.544	2025-08-21 20:46:46.544
17	1	Bankruptcy Disputes	bankruptcy	2025-08-21 20:47:39.167	2025-08-21 20:47:39.167
18	1	Rental Disputes	rental	2025-08-21 20:47:46.478	2025-08-21 20:47:46.478
19	1	Compensation Claims	compensationclaims	2025-08-21 20:47:59.655	2025-08-21 20:47:59.655
20	1	Insurance Disputes	insurance	2025-08-21 20:48:08.692	2025-08-21 20:48:08.692
21	1	Financial Crime	crime	2025-08-21 20:48:15.585	2025-08-21 20:48:15.585
22	1	Bankruptcy Disputes 2	bankru2	2025-08-21 20:49:06.564	2025-08-21 20:49:06.564
23	1	Bankruptcy Disputes 3	bankruptcy3	2025-08-21 20:49:22.444	2025-08-21 20:49:22.444
\.


--
-- Name: Expertise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."Expertise_id_seq"', 3, true);


--
-- Name: FooterLink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."FooterLink_id_seq"', 22, true);


--
-- Name: Insight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."Insight_id_seq"', 11, true);


--
-- Name: Partner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."Partner_id_seq"', 8, true);


--
-- Name: People_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."People_id_seq"', 25, true);


--
-- Name: Service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."Service_id_seq"', 23, true);


--
-- Name: Block Block_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Block"
    ADD CONSTRAINT "Block_pkey" PRIMARY KEY ("id");


--
-- Name: DynamicPage DynamicPage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."DynamicPage"
    ADD CONSTRAINT "DynamicPage_pkey" PRIMARY KEY ("id");


--
-- Name: Expertise Expertise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Expertise"
    ADD CONSTRAINT "Expertise_pkey" PRIMARY KEY ("id");


--
-- Name: FooterLink FooterLink_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."FooterLink"
    ADD CONSTRAINT "FooterLink_pkey" PRIMARY KEY ("id");


--
-- Name: FooterText FooterText_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."FooterText"
    ADD CONSTRAINT "FooterText_pkey" PRIMARY KEY ("key");


--
-- Name: Insight Insight_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Insight"
    ADD CONSTRAINT "Insight_pkey" PRIMARY KEY ("id");


--
-- Name: Partner Partner_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Partner"
    ADD CONSTRAINT "Partner_pkey" PRIMARY KEY ("id");


--
-- Name: People People_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."People"
    ADD CONSTRAINT "People_pkey" PRIMARY KEY ("id");


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("id");


--
-- Name: Block_pageRelUrl_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Block_pageRelUrl_idx" ON "public"."Block" USING "btree" ("pageRelUrl");


--
-- Name: Block_pageRelUrl_key_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Block_pageRelUrl_key_key" ON "public"."Block" USING "btree" ("pageRelUrl", "key");


--
-- Name: DynamicPage_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "DynamicPage_slug_key" ON "public"."DynamicPage" USING "btree" ("slug");


--
-- Name: Insight_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Insight_slug_key" ON "public"."Insight" USING "btree" ("slug");


--
-- Name: Partner_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Partner_slug_key" ON "public"."Partner" USING "btree" ("slug");


--
-- Name: Service_expertiseId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Service_expertiseId_idx" ON "public"."Service" USING "btree" ("expertiseId");


--
-- Name: Service_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Service_slug_key" ON "public"."Service" USING "btree" ("slug");


--
-- Name: Service Service_expertiseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Service"
    ADD CONSTRAINT "Service_expertiseId_fkey" FOREIGN KEY ("expertiseId") REFERENCES "public"."Expertise"("id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

