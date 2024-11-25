// import React, { useEffect, useState } from 'react';
// import { Box, Button, Stack, TextField, Typography } from '@mui/material';

// import { exerciseOptions, fetchData } from '../utils/fetchData';
// import HorizontalScrollbar from './HorizontalScrollbar';

// const SearchExercises = ({ bodyPart, setBodyPart }) => {
// 	const [search, setSearch] = useState('');
// 	const [exercises, setExercises] = useState([]);
// 	const [bodyParts, setBodyParts] = useState([]);

// 	// Fetch the list of body parts for the horizontal scroll bar
// 	useEffect(() => {
// 		const fetchBodyParts = async () => {
// 			try {
// 				const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
// 				if (Array.isArray(bodyPartsData)) {
// 					setBodyParts(['all', ...bodyPartsData]);
// 				} else {
// 					console.error('Unexpected response for body parts:', bodyPartsData);
// 				}
// 			} catch (error) {
// 				console.error('Error fetching body parts:', error);
// 			}
// 		};
// 		fetchBodyParts();
// 	}, []);

// 	// Handle search logic
// 	const handleSearch = async (e) => {
// 		if (e && e.preventDefault) {
// 			e.preventDefault();
// 		}
// 		// Trim and validate the search input
// 		const trimmedSearch = search.trim().toLowerCase();
// 		if (trimmedSearch) {
// 			try {
// 				// Fetch fresh data from the API
// 				const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

// 				// Check if data was fetched successfully
// 				if (!Array.isArray(exercisesData)) {
// 					console.error('Unexpected data format:', exercisesData);
// 					return;
// 				}

// 				// Log fetched data for debugging
// 				console.log('Fetched exercises data:', exercisesData);
// 				console.log('Search term:', trimmedSearch);

// 				// Filter exercises based on search criteria with enhanced logging
// 				const searchedExercises = exercisesData.filter((item) => {
// 					// Convert the fields to lowercase for case-insensitive matching
// 					const nameMatch = item.name.toLowerCase().includes(trimmedSearch);
// 					const targetMatch = item.target.toLowerCase().includes(trimmedSearch);
// 					const equipmentMatch = item.equipment.toLowerCase().includes(trimmedSearch);
// 					const bodyPartMatch = item.bodyPart.toLowerCase().includes(trimmedSearch);

// 					// Log each match to see what's happening
// 					console.log(`Checking exercise: ${item.name}`);
// 					console.log(`Matches - Name: ${nameMatch}, Target: ${targetMatch}, Equipment: ${equipmentMatch}, Body Part: ${bodyPartMatch}`);

// 					// Return true if any match is found
// 					return nameMatch || targetMatch || equipmentMatch || bodyPartMatch;
// 				});

// 				// Log filtered data for debugging
// 				console.log('Filtered exercises:', searchedExercises);

// 				// Scroll smoothly after search
// 				window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

// 				// Clear the search input and set the searched exercises
// 				setSearch('');
// 				setExercises(searchedExercises); // Set the exercises
// 			} catch (error) {
// 				console.error('Error fetching exercises:', error);
// 			}
// 		}
// 	};

// 	return (
// 		<Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
// 			<Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
// 				Awesome Exercises You <br /> Should Know
// 			</Typography>
// 			<Box position="relative" mb="72px">
// 				<TextField
// 					height="76px"
// 					sx={{
// 						input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
// 						width: { lg: '1170px', xs: '350px' },
// 						backgroundColor: '#fff',
// 						borderRadius: '40px',
// 					}}
// 					value={search}
// 					onChange={(e) => setSearch(e.target.value)}
// 					placeholder="Search Exercises"
// 					type="text"
// 				/>
// 				<Button
// 					className="search-btn"
// 					type='button'
// 					sx={{
// 						bgcolor: '#FF2625',
// 						color: '#fff',
// 						textTransform: 'none',
// 						width: { lg: '173px', xs: '80px' },
// 						height: '56px',
// 						position: 'absolute',
// 						right: '0px',
// 						fontSize: { lg: '20px', xs: '14px' },
// 					}}
// 					onClick={handleSearch}
// 				>
// 					Search
// 				</Button>
// 			</Box>

// 			{/* Horizontal scrollbar for body parts */}
// 			<Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
// 				<HorizontalScrollbar data={bodyParts} setBodyPart={setBodyPart} bodyPart={bodyPart} />
// 			</Box>

// 			{/* Render searched exercises */}
// 			<Box>
// 				<Typography fontWeight={700} sx={{ fontSize: '24px' }} mb="20px" textAlign="center">
// 					Results
// 				</Typography>
// 				<Stack spacing={3}>
// 					{exercises.length > 0 ? (
// 						exercises.map((exercise) => (
// 							<Box key={exercise.id} sx={{ border: '1px solid #ccc', borderRadius: '10px', padding: '16px' }}>
// 								<Typography fontWeight={600} variant="h6">{exercise.name}</Typography>
// 								<Typography variant="body2">Target: {exercise.target}</Typography>
// 								<Typography variant="body2">Equipment: {exercise.equipment}</Typography>
// 							</Box>
// 						))
// 					) : (
// 						<Typography variant="body2">No exercises found</Typography>
// 					)}
// 				</Stack>
// 			</Box>
// 		</Stack>
// 	);
// };

// export default SearchExercises;

import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
	const [search, setSearch] = useState('');
	const [bodyParts, setBodyParts] = useState([]);

	useEffect(() => {
		const fetchExercisesData = async () => {
			try {
				const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
				
				// Ensure bodyPartsData is an array before using the spread operator
				if (Array.isArray(bodyPartsData)) {
					setBodyParts(["all", ...bodyPartsData]);
				} else {
					console.error('Expected bodyPartsData to be an array, but received:', bodyPartsData);
					setBodyParts(["all",...bodyPartsData]); // Default to "all" if data is not an array
				}
			} catch (error) {
				console.error('Error fetching body parts data:', error);
			}
		};
	
		fetchExercisesData();
	}, []);
	

	const handleSearch = async () => {
		if (search) {
			const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=0', exerciseOptions);

			const searchedExercises = exercisesData.filter(
				(item) => item.name.toLowerCase().includes(search)
					|| item.target.toLowerCase().includes(search)
					|| item.equipment.toLowerCase().includes(search)
					|| item.bodyPart.toLowerCase().includes(search)
			);

			window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

			setSearch('');
			setExercises(searchedExercises);
		}
	};

	return (
		<Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
			<Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
				Awesome Exercises You <br /> Should Know
			</Typography>
			<Box position="relative" mb="72px">
				<TextField
					height="76px"
					sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
					value={search}
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
					placeholder="Search Exercises"
					type="text"
				/>
				<Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} onClick={handleSearch}>
					Search
				</Button>
			</Box>
			<Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
				<HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
			</Box>
		</Stack>
	);
};

export default SearchExercises;
