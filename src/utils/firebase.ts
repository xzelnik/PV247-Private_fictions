import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore,
	Timestamp
} from 'firebase/firestore';

// Initialize Firebase

/**
 * TODO setup new firebase project/app and replace this config
 */
initializeApp({
	apiKey: 'AIzaSyBuhsAp5o0x9dF7blhpMsNI-yoV0Ccr2eQ',
	authDomain: 'task-8-25326.firebaseapp.com',
	projectId: 'task-8-25326',
	storageBucket: 'task-8-25326.appspot.com',
	messagingSenderId: '756714021497',
	appId: '1:756714021497:web:b1a81d3b3e9fbab6b66aa8'
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// collections
export type Comment = {
	id: string;
	by: string;
	text: string;
	storyId: string;
	date: Timestamp;
};

export type Rating = {
	by: string;
	storyId: string;
	value: number;
};

export type Story = {
	by: string;
	title: string;
	shortDescription: string;
	text: string;
	date: Timestamp;
	tags: string;
	rating: number;
	ratingCount: number;
	id: string;
};

export const commentsCollection = collection(
	db,
	'comments'
) as CollectionReference<Comment>;

export const commentsDocument = (id: string) =>
	doc(db, 'comments', id) as DocumentReference<Comment>;

export const ratingsCollection = collection(
	db,
	'ratings'
) as CollectionReference<Rating>;

export const ratingsDocument = (id: string) =>
	doc(db, 'ratings', id) as DocumentReference<Rating>;

export const storiesCollection = collection(
	db,
	'stories'
) as CollectionReference<Story>;

export const storiesDocument = (id: string) =>
	doc(db, 'stories', id) as DocumentReference<Story>;
