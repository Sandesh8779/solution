import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth functions that check Supabase database
export const signIn = async (email, password) => {
  try {
    const emailLower = email.toLowerCase();
    console.log('Attempting login with:', emailLower);
    
    // Offline demo users (remove this when Supabase is working)
    const demoUsers = [
      { id: 1, email: 'admin@solution.com', password: 'admin123', name: 'Admin User', role: 'admin' },
      { id: 2, email: 'user@solution.com', password: 'user123', name: 'Regular User', role: 'user' },
      { id: 3, email: 'worker@solution.com', password: 'worker123', name: 'Worker User', profiletype: 1 }
    ];
    
    const demoUser = demoUsers.find(u => u.email === emailLower && u.password === password);
    if (demoUser) {
      console.log('Demo login successful:', demoUser);
      return { data: demoUser, error: null };
    }
    
    // Check in users table first
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .ilike('email', emailLower)
      .eq('password', password)
      .maybeSingle();
    
    if (userData) {
      console.log('Found user:', userData);
      return { data: userData, error: null };
    }
    
    // Check in workers table
    const { data: workerData, error: workerError } = await supabase
      .from('workers')
      .select('*')
      .ilike('email', emailLower)
      .eq('password', password)
      .maybeSingle();
    
    if (workerData) {
      console.log('Found worker:', workerData);
      return { data: { ...workerData, role: 'worker' }, error: null };
    }
    
    console.log('User error:', userError);
    console.log('Worker error:', workerError);
    return { data: null, error: { message: 'Invalid credentials' } };
    
  } catch (error) {
    console.error('Login error:', error);
    if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      return { data: null, error: { message: 'Cannot connect to server. Supabase may be down. Please try again later.' } };
    }
    return { data: null, error: { message: 'Login failed. Please check your connection.' } };
  }
}

export const signUp = async (email, password, name, role = 'user', serviceType = null, phone = null, location = null) => {
  try {
    const emailLower = email.toLowerCase();
    
    if (role === 'worker') {
      // Insert worker into workers table
      const { data, error } = await supabase
        .from('workers')
        .insert([{ 
          email: emailLower, 
          password,
          name, 
          service_type: serviceType, 
          phone, 
          location,
          profiletype: 1
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Worker signup error:', error);
        return { data: null, error: { message: 'Failed to create worker account' } };
      }
      
      return { data, error: null };
    } else {
      // Insert user into users table
      const { data, error } = await supabase
        .from('users')
        .insert([{ 
          email: emailLower, 
          password,
          name, 
          role: role === 'admin' ? 'admin' : 'user',
          location
        }])
        .select()
        .single();
      
      if (error) {
        console.error('User signup error:', error);
        return { data: null, error: { message: 'Failed to create user account' } };
      }
      
      return { data, error: null };
    }
  } catch (error) {
    console.error('Signup error:', error);
    return { data: null, error: { message: 'Signup failed' } };
  }
}

export const signOut = async () => {
  // Mock signout
  return { error: null }
}

export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}

export const getUsers = async () => {
  const { data, error } = await supabase.from('users').select('*')
  return { data, error }
}

export const getWorkers = async () => {
  const { data, error } = await supabase.from('workers').select('*')
  return data || []
}

export const getRequests = async () => {
  const { data, error } = await supabase.from('requests').select('*')
  return data || []
}

export const getServiceCategories = async () => {
  const { data, error } = await supabase.from('service_categories').select('*')
  console.log('Service categories from database:', data);
  console.log('Service categories error:', error);
  return data || []
}

export const createRequest = async (requestData) => {
  const { data, error } = await supabase.from('requests').insert([requestData]).select().single()
  if (error) throw error
  return data
}

export const updateRequest = async (id, updates) => {
  const { data, error } = await supabase.from('requests').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export const assignWorkerToRequest = async (requestId, workerId) => {
  const { data, error } = await supabase
    .from('requests')
    .update({ 
      worker_id: workerId, 
      status: 'assigned',
      assigned_at: new Date().toISOString()
    })
    .eq('id', requestId)
    .select()
    .single()
  if (error) throw error
  return data
}

export const createContactMessage = async (messageData) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{
      name: messageData.name,
      email: messageData.email,
      subject: messageData.subject,
      message: messageData.message,
      created_at: new Date().toISOString()
    }])
    .select()
    .single()
  if (error) throw error
  return data
}

export const getContactMessages = async () => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}